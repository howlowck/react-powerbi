import React from 'react'
import ReactDOM from 'react-dom'
import PowerBiEmbedded from '../src/index'

type Props = {
  token: string;
}

// eslint-disable-next-line react/prop-types
const Example: React.FC<Props> = ({token}) => {
  return <div>
    <PowerBiEmbedded
      id="f6bfd646-b718-44dc-a378-b73e6b528204"
      width={400}
      height={300}
      pageName="test"
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      // onLoad={() => {
      //   console.log('rendered!!!')
      // }}
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
        <Example token={token}/>
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
