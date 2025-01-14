import React, { FC } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

type WithLoadingProps = {
  isLoading: boolean
}

function withLoaderOverlay<P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P & WithLoadingProps> {
  return function WithLoaderOverlayComponent(props) {
    const { isLoading, ...restProps } = props

    return (
      <Box position="relative" display="inline-block">
        <WrappedComponent {...(restProps as P)} />

        {isLoading && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    )
  }
}

export default withLoaderOverlay
