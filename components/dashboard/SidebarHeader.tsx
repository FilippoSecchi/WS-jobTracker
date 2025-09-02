import { cn } from '@/lib/utils'

interface SidebarHeaderProps {
  isCollapsed: boolean
  companyName: string
  companyLogo: string
}

export function SidebarHeader({ isCollapsed, companyName, companyLogo }: SidebarHeaderProps) {
  return (
    <div className="p-4 border-b">
      <div className={cn(
        "flex items-center transition-all duration-300",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {companyLogo}
          </div>
        ) : (
          <h2 className="mt-1 text-xl font-bold text-foreground">{companyName}</h2>
        )}
      </div>
    </div>
  )
}