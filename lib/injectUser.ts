import { ReactNode, ReactElement, isValidElement, cloneElement, Children } from "react";
import { UserProfile } from "@/components/dashboard/NavbarProfile";

// Inject `user` prop into any valid React element children.
// Note: Not all children accept a `user` prop, so we cast for safety.
export function injectUserToChildren(children: ReactNode, user: UserProfile | null): ReactNode {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      // Cast to a ReactElement with user prop and inject `user`
      return cloneElement(child as ReactElement<{ user?: UserProfile }>, { user: user ?? undefined });
    }
    return child;
  });
}
