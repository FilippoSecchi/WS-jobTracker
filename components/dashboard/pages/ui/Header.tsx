import { HelpCircle } from "lucide-react";


interface HeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode[];
  icon?: React.ReactNode;
}

export function Header({
  title,
  description,
  actions,
  icon = <HelpCircle className='h-5 w-5' />
}: HeaderProps) {
  return (
    <>
      <div className='pt-4 space-y-2 pb-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full p-2'>
              {icon}
            </div>
            <h1 className='text-3xl font-bold'>{title}</h1>
          </div>
          {actions && actions.length > 0 && (
            <div className='flex gap-2'>
              {actions.map((action, idx) => (
                <div key={idx}>{action}</div>
              ))}
            </div>
          )}
        </div>
        {description && <p className='text-muted-foreground pt-4'>{description}</p>}
      </div>
    </>
  );
}

export default Header;