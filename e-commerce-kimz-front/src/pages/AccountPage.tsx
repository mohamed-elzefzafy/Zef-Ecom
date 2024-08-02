import Heading from "@components/common/heading/Heading"
import { useAppSelector } from "src/redux/hooks"

const AccountPage = () => {
  const accountInfo = useAppSelector(state => state.auth.user)
  return (
<>
<>
      <Heading title="Account Info" />
      <ul>
        <li> <strong>First Name :</strong> {accountInfo?.firstName}</li>
        <li> <strong>Last Name :</strong> {accountInfo?.lastName}</li>
        <li> <strong>Email :</strong>{accountInfo?.email}</li>
      </ul>
    </>
</>
  )
}

export default AccountPage