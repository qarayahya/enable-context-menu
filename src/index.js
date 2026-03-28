import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useCallback, useState, useMemo } from '@wordpress/element';
import { BlockSettingsMenu, store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';

const withContextMenu = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const { clientId } = props;
			const [ anchorData, setAnchorData ] = useState( null );
			const { selectBlock } = useDispatch( blockEditorStore );

			const onContextMenu = useCallback(
				( event ) => {
					event.preventDefault();
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
					<div className="enable-context-menu__menu-wrapper" style={{ display: 'none' }}>
						<BlockSettingsMenu
							clientIds={ [ clientId ] }
							open={ !! anchorData }
							onToggle={ ( isOpen ) => {
								if ( ! isOpen ) setAnchorData( null );
							} }
							popoverProps={ { anchor: popoverAnchor } }
						/>
					</div>
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
