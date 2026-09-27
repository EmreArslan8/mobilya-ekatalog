"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AdminPageHeader } from "@/components/admin/common/page-header"
import { SaveBar } from "@/components/admin/common/save-bar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDB } from "@/lib/store/db"
import { AppearanceTab } from "./appearance-tab"
import { BrandTab } from "./brand-tab"
import { ContactTab } from "./contact-tab"
import { DemoTab } from "./demo-tab"
import { StorefrontTab } from "./storefront-tab"
import { useSettingsDraft } from "./use-settings-draft"

const TABS = [["genel", "Genel"], ["gorunum", "Görünüm"], ["vitrin", "Vitrin"], ["iletisim", "İletişim"], ["demo", "Demo verisi"]] as const

export function SettingsView() {
  const data = useDB((s) => s.data)
  const { draft, set, dirty, save, reset, setDraft } = useSettingsDraft()
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()
  const tab = params.get("tab") ?? "genel"

  return (
    <>
      <AdminPageHeader title="Site ayarları" text="Marka, görünüm, vitrin ve iletişim bilgileri." actions={<Button onClick={save} disabled={!dirty}>Kaydet</Button>} />
      <Tabs value={tab} onValueChange={(v) => router.replace(`${path}?tab=${v}`, { scroll: false })}>
        <TabsList className="no-scrollbar mb-5 w-full justify-start overflow-x-auto sm:w-fit">
          {TABS.map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="genel"><BrandTab draft={draft} set={set} /></TabsContent>
        <TabsContent value="gorunum"><AppearanceTab draft={draft} set={set} /></TabsContent>
        <TabsContent value="vitrin"><StorefrontTab draft={draft} set={set} data={data} /></TabsContent>
        <TabsContent value="iletisim"><ContactTab draft={draft} set={set} /></TabsContent>
        <TabsContent value="demo"><DemoTab onLoaded={() => setDraft(useDB.getState().data.config)} /></TabsContent>
      </Tabs>
      <SaveBar visible={dirty} isNew={false} onSave={save} onDiscard={reset} />
    </>
  )
}
