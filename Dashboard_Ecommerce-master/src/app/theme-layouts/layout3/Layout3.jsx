import FuseDialog from '@fuse/core/FuseDialog';
import { styled } from '@mui/material/styles';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseSuspense from '@fuse/core/FuseSuspense';
import clsx from 'clsx';
import { memo, Suspense, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import AppContext from 'app/AppContext';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import Configurator from 'app/theme-layouts/shared-components/configurator/Configurator';
import LeftSideLayout3 from './components/LeftSideLayout3';
import NavbarWrapperLayout3 from './components/NavbarWrapperLayout3';
import RightSideLayout3 from './components/RightSideLayout3';
import ToolbarLayout3 from './components/ToolbarLayout3';

const Root = styled('div')(({ config }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

/**
 * The layout 3.
 */
function Layout3(props) {
	const { children } = props;
	const config = useSelector(selectFuseCurrentLayoutConfig);
	const appContext = useContext(AppContext);
	const { routes } = appContext;
	return (
		<Root
			id="fuse-layout"
			className="flex w-full"
			config={config}
		>
			{config.leftSidePanel.display && <LeftSideLayout3 />}

			<div className="flex min-w-0 flex-auto flex-col">
				<main
					id="fuse-main"
					className="relative flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.navbar.display && (
						<NavbarWrapperLayout3
							className={clsx(config?.navbar?.style === 'fixed' ? 'sticky top-0 z-50' : '')}
						/>
					)}

					{config.toolbar.display && (
						<ToolbarLayout3
							className={clsx(
								config.toolbar.style === 'fixed' && 'sticky top-0',
								config.toolbar.position === 'above' && 'z-40 order-first'
							)}
						/>
					)}

					<div className="sticky top-0 z-99">
						<Configurator />
					</div>

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<FuseSuspense>{useRoutes(routes)}</FuseSuspense>

						<Suspense>
							<FuseDialog />
						</Suspense>
						{children}
					</div>
				</main>
			</div>

			{config.rightSidePanel.display && <RightSideLayout3 />}
			<FuseMessage />
		</Root>
	);
}

export default memo(Layout3);
