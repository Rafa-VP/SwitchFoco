import { Loader, Space, Switch, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import deta from "./api/deta"
import "./App.css"
import IconMoonStarts from "./icons/IconMoonStarts"
import IconSun from "./icons/IconSun"

function App() {
  const [state, setState] = useState("off")

  function toggleCheckbox(element) {
    var xhr = new XMLHttpRequest()
    if (element.checked) {
      setState("on")
      xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=on", true)
    } else {
      setState("off")
      xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=off", true)
    }
    xhr.send()
  }

  const { isLoading, isFetching } = useQuery({
    queryKey: ["deta"],
    queryFn: async () => await (await deta.get("/get-switch")).data,
    onSuccess: (res) => setState(res),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  })

  if (isLoading) return <Loader />

  return (
    <div>
      <Title color={"cyan"}>Relay Switch</Title>
      <Space h={"xl"} />
      <Switch
        size={"xl"}
        onLabel={<IconSun />}
        offLabel={<IconMoonStarts />}
        color={"cyan"}
        onChange={(e) => toggleCheckbox(e.target)}
        checked={state === "on" ? true : false}
        disabled={isFetching}
        label={isFetching && "Refreshing..."}
        labelPosition={"right"}
      />
    </div>
  )
}

export default App
