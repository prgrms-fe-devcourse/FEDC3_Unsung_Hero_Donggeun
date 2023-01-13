import useAxios from '../api/useAxios';
import { IUser } from '../types/user';

interface IProps {
  followers: string[];
}
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const PROFIE_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const UserFollowers = ({ followers }: IProps) => {
  const { data } = useAxios<[]>({
    url: `${API_URL}/users/get-users`,
    method: 'get',
  });

  const followersList = data?.filter((user: IUser) => followers.includes(user._id));

  return (
    <>
      {followersList &&
        followersList.map((user: IUser) => (
          <>
            <img src={user.image && PROFIE_IMG_URL} width='80px' height='80px' />
            <span>{user.fullName}</span>
          </>
        ))}
    </>
  );
};

export default UserFollowers;
