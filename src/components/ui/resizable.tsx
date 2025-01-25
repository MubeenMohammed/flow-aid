"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={className}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={`relative flex w-1 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors
      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
      data-[panel-group-direction=vertical]:h-1 
      data-[panel-group-direction=vertical]:w-full ${className}`}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-8 w-3 items-center justify-center rounded-sm hover:bg-gray-300">
        <GripVertical className="h-4 w-4 text-gray-500" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} 