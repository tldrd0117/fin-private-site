import { AppBarContentsTemplate } from "@/components/templates/AppBarContentsTemplate";

export default function Template({ children }: { children: React.ReactNode }) {
  return <>
        <AppBarContentsTemplate>
            {children}
        </AppBarContentsTemplate>
    </>
}