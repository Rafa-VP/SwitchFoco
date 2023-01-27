import { JsonInput, Loader, Space, Switch, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import deta from "./api/deta"
import "./App.css"
import IconMoonStarts from "./icons/IconMoonStarts"
import IconSun from "./icons/IconSun"

function App() {
  // ||========================== STATES ===========================||
  const [state, setState] = useState({})
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // ||========================== GET RELAY STATE ===========================||
  const { isInitialLoading } = useQuery({
    queryKey: ["deta"],
    queryFn: async () => await (await deta.get("/get-switch")).data,
    onSuccess: (res) => setState({ status: res, global_state: res }),
  })

  // ||========================== HANDLE CHANGE STATE ===========================||
  function toggleCheckbox(element) {
    try {
      setIsButtonDisabled(true)
      var xhr = new XMLHttpRequest()
      if (element.checked) {
        xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=on", true)
      } else {
        xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=off", true)
      }
      xhr.send()
      xhr.onprogress = () => setIsButtonDisabled(false)
    } catch (err) {
      console.error({ error: err })
    } finally {
      xhr.onload = () => {
        setState(JSON.parse(xhr.response))
      }
    }
  }

  // ||========================== RETURN LOADING ===========================||
  if (isInitialLoading) return <Loader />

  // ||========================== MAIN APP ===========================||
  return (
    <div>
      <Title color={"cyan"}>Relay Switch</Title>
      <Space h={"xl"} />
      <Switch
        size={"xl"}
        onLabel={!isButtonDisabled ? <IconSun /> : "Loading..."}
        offLabel={!isButtonDisabled ? <IconMoonStarts /> : "Loading..."}
        color={"cyan"}
        onChange={(e) => toggleCheckbox(e.target)}
        checked={state.global_state === "on" ? true : false}
        disabled={isButtonDisabled}
      />
      <Space h={"xl"} />
      <JsonInput placeholder={JSON.stringify(state)} disabled={true} />
    </div>
  )
}

export default App
