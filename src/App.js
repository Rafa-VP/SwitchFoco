import { Group, Space, Switch, Title, useMantineTheme } from "@mantine/core"
import { useState } from "react"
import "./App.css"
import IconMoonStarts from "./icons/IconMoonStarts"
import IconSun from "./icons/IconSun"

function App() {
	const theme = useMantineTheme()
	const [timelapse, setTimeLapse] = useState(10)

  function toggleCheckbox(element) {
    var xhr = new XMLHttpRequest()
    if (element.checked) {
      xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=on", true)
    } else {
      xhr.open("GET", "https://p9lrcf.deta.dev/switch-foco?relay=off", true)
    }
    xhr.send()
  }

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
      />
    </div>
  )
}

export default App
