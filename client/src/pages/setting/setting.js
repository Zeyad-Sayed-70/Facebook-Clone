import SettingStyled from './setting.styled'
import PermanentDrawerLeft from '../../components/setting/Setting'

const Setting = () => {
  return (
    <SettingStyled>
      <div className="bg-overlay"></div>
      <PermanentDrawerLeft />
    </SettingStyled>
  )
}

export default Setting