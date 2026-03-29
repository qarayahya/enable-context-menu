import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useCallback, useState, useMemo } from '@wordpress/element';
import {
	Popover,
	MenuGroup,
	MenuItem,
	Modal,
	TextControl,
	Button,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { serialize, parse, getBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './editor.scss';

// Style attributes to transfer when copying/pasting styles.
const STYLE_ATTRS = [
	'align', 'borderColor', 'backgroundColor', 'textAlign',
	'textColor', 'gradient', 'className', 'fontFamily',
	'fontSize', 'layout', 'style',
];

function ContextMenuPopover( { clientId, anchor, onClose } ) {
	const [ isRenaming, setIsRenaming ] = useState( false );
	const [ renameValue, setRenameValue ] = useState( '' );

	const { block, blockName, metadata, canRemove, canDuplicate, canRename } =
		useSelect(
			( select ) => {
				const {
					getBlock,
					getBlockName,
					getBlockAttributes,
					canRemoveBlocks,
					canInsertBlockType,
					getBlockRootClientId,
				} = select( blockEditorStore );

				const _block = getBlock( clientId );
				const _blockName = getBlockName( clientId );
				const rootClientId = getBlockRootClientId( clientId );

				return {
					block: _block,
					blockName: _blockName,
					metadata: getBlockAttributes( clientId )?.metadata,
					canRemove: canRemoveBlocks( [ clientId ] ),
					canDuplicate:
						!! _block &&
						canInsertBlockType( _blockName, rootClientId ),
					canRename:
						!! _blockName &&
						getBlockSupport( _blockName, 'renaming', true ),
				};
			},
			[ clientId ]
		);

	const { removeBlocks, duplicateBlocks, updateBlockAttributes, insertBlocks } =
		useDispatch( blockEditorStore );

	// ── Copy ────────────────────────────────────────────────────────────────
	const handleCopy = useCallback( async () => {
		if ( ! block ) return;
		await navigator.clipboard.writeText( serialize( [ block ] ) );
		onClose();
	}, [ block, onClose ] );

	// ── Paste ───────────────────────────────────────────────────────────────
	const handlePaste = useCallback( async () => {
		try {
			const text = await navigator.clipboard.readText();
			const blocks = parse( text );
			if ( blocks.length ) {
				insertBlocks( blocks );
			}
		} catch ( e ) {
			// Clipboard access denied — silently ignore.
		}
		onClose();
	}, [ insertBlocks, onClose ] );

	// ── Duplicate ───────────────────────────────────────────────────────────
	const handleDuplicate = useCallback( async () => {
		await duplicateBlocks( [ clientId ], false );
		onClose();
	}, [ clientId, duplicateBlocks, onClose ] );

	// ── Delete ──────────────────────────────────────────────────────────────
	const handleDelete = useCallback( () => {
		removeBlocks( [ clientId ] );
		onClose();
	}, [ clientId, removeBlocks, onClose ] );

	// ── Copy Styles ─────────────────────────────────────────────────────────
	const handleCopyStyles = useCallback( async () => {
		if ( ! block ) return;
		// Serialize the full block so paste-styles can extract what it needs.
		await navigator.clipboard.writeText( serialize( [ block ] ) );
		onClose();
	}, [ block, onClose ] );

	// ── Paste Styles ────────────────────────────────────────────────────────
	const handlePasteStyles = useCallback( async () => {
		try {
			const text = await navigator.clipboard.readText();
			const [ sourceBlock ] = parse( text );
			if ( ! sourceBlock || ! block ) return;

			const attrs = STYLE_ATTRS.reduce( ( acc, attr ) => {
				if ( sourceBlock.attributes[ attr ] !== undefined ) {
					acc[ attr ] = sourceBlock.attributes[ attr ];
				}
				return acc;
			}, {} );

			if ( Object.keys( attrs ).length ) {
				updateBlockAttributes( [ clientId ], attrs );
			}
		} catch ( e ) {
			// Clipboard access denied — silently ignore.
		}
		onClose();
	}, [ block, clientId, updateBlockAttributes, onClose ] );

	// ── Rename ──────────────────────────────────────────────────────────────
	const openRename = useCallback( () => {
		setRenameValue( metadata?.name || '' );
		setIsRenaming( true );
	}, [ metadata ] );

	const handleRename = useCallback( () => {
		updateBlockAttributes( [ clientId ], {
			metadata: {
				...metadata,
				name: renameValue || undefined,
			},
		} );
		setIsRenaming( false );
		onClose();
	}, [ clientId, metadata, renameValue, updateBlockAttributes, onClose ] );

	return (
		<>
			<Popover
				anchor={ anchor }
				onClose={ onClose }
				placement="bottom-start"
				className="enable-context-menu__popover"
			>
				<MenuGroup>
					<MenuItem onClick={ handleCopy }>
						{ __( 'Copy' ) }
					</MenuItem>
					<MenuItem onClick={ handlePaste }>
						{ __( 'Paste' ) }
					</MenuItem>
					{ canDuplicate && (
						<MenuItem onClick={ handleDuplicate }>
							{ __( 'Duplicate' ) }
						</MenuItem>
					) }
				</MenuGroup>
				<MenuGroup>
					<MenuItem onClick={ handleCopyStyles }>
						{ __( 'Copy Styles' ) }
					</MenuItem>
					<MenuItem onClick={ handlePasteStyles }>
						{ __( 'Paste Styles' ) }
					</MenuItem>
				</MenuGroup>
				{ canRename && (
					<MenuGroup>
						<MenuItem onClick={ openRename }>
							{ __( 'Rename' ) }
						</MenuItem>
					</MenuGroup>
				) }
				{ canRemove && (
					<MenuGroup>
						<MenuItem isDestructive onClick={ handleDelete }>
							{ __( 'Delete' ) }
						</MenuItem>
					</MenuGroup>
				) }
			</Popover>

			{ isRenaming && (
				<Modal
					title={ __( 'Rename block' ) }
					onRequestClose={ () => setIsRenaming( false ) }
					size="small"
				>
					<form
						onSubmit={ ( e ) => {
							e.preventDefault();
							handleRename();
						} }
					>
						<VStack spacing="3">
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Name' ) }
								value={ renameValue }
								onChange={ setRenameValue }
								autoFocus
							/>
							<HStack justify="right">
								<Button
									__next40pxDefaultSize
									variant="tertiary"
									onClick={ () => setIsRenaming( false ) }
								>
									{ __( 'Cancel' ) }
								</Button>
								<Button
									__next40pxDefaultSize
									variant="primary"
									type="submit"
								>
									{ __( 'Save' ) }
								</Button>
							</HStack>
						</VStack>
					</form>
				</Modal>
			) }
		</>
	);
}

// ── HOC ─────────────────────────────────────────────────────────────────────

const withContextMenu = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const { clientId } = props;
			const [ anchorData, setAnchorData ] = useState( null );
			const { selectBlock } = useDispatch( blockEditorStore );

			const onContextMenu = useCallback(
				( event ) => {
					event.preventDefault();
					event.stopPropagation();
					selectBlock( clientId );

					// Translate iframe-relative coords to outer document coords.
					const iframeEl = event.view?.frameElement;
					const iframeRect = iframeEl?.getBoundingClientRect() ?? {
						left: 0,
						top: 0,
					};

					setAnchorData( {
						rect: new window.DOMRect(
							iframeRect.left + event.clientX,
							iframeRect.top + event.clientY,
							0,
							0
						),
						ownerDocument: event.target.ownerDocument,
					} );
				},
				[ clientId, selectBlock ]
			);

			const popoverAnchor = useMemo( () => {
				if ( ! anchorData ) return undefined;
				return {
					ownerDocument: anchorData.ownerDocument,
					getBoundingClientRect: () => anchorData.rect,
				};
			}, [ anchorData ] );

			const wrapperProps = {
				...( props.wrapperProps || {} ),
				onContextMenu,
			};

			return (
				<>
					<BlockListBlock { ...props } wrapperProps={ wrapperProps } />
					{ anchorData && (
						<ContextMenuPopover
							clientId={ clientId }
							anchor={ popoverAnchor }
							onClose={ () => setAnchorData( null ) }
						/>
					) }
				</>
			);
		};
	},
	'withContextMenu'
);

addFilter(
	'editor.BlockListBlock',
	'enable-context-menu/with-context-menu',
	withContextMenu
);
