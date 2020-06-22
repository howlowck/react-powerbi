import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PowerBiEmbedded from '../src/index'

type Props = {
  token: string;
}

// eslint-disable-next-line react/prop-types
const Example: React.FC<Props> = ({token}) => {
  const [mobileVal, setMobileVal] = useState(false)
  const [widthValue, setWidthValue] = useState(400)
  return <div>
    <button onClick={() => {setMobileVal(true)}}>Make Mobile</button>
    <button onClick={() => {setMobileVal(false)}}>Remove Mobile</button>
    <input onChange={(evt) => {setWidthValue(+evt.target.value)}} value={widthValue}/>
    <PowerBiEmbedded
      id="f6bfd646-b718-44dc-a378-b73e6b528204"
      width={widthValue}
      height={700}
      pageName="test"
      mobile={mobileVal}
      // onEmbed={() => console.log('loaded!!!!!')}
      permissions={7}
      embedType="report"
      embedUrl="https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d"
      accessToken={token}
    />
  </div>
}

fetch('https://powerbiplaygroundbe.azurewebsites.net/api/Reports/SampleReport')
  .then(res => res.json())
  .then((data) => {
    const token = data.embedToken.token

    ReactDOM.render(
      <React.StrictMode>
        <Example token={token} />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
