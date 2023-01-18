import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAxios from '../api/useAxios';
import { Avatar, Pagination } from '../common';
import useFollow from '../follow/useFollow';
import { IUser } from '../types/user';

const UserFollowing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followButton, userFollow } = useFollow(id as string);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data } = useAxios<[]>({
    url: `/users/get-users`,
    method: 'get',
  });

  const followingsList = data?.filter((user: IUser) => userFollow?.following?.includes(user._id));
  const handleClickUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <Wrapper>
      <Title>팔로잉</Title>
      {followingsList &&
        followingsList.slice(offset, offset + limit).map((user: IUser) => (
          <div key={user._id} onClick={() => handleClickUser(user._id)}>
            <UserWrapper>
              <Avatar src={user.image} width={80} height={80} />
              <UserName>{user.fullName}</UserName>
              {followButton(user._id)}
            </UserWrapper>
          </div>
        ))}
      {followingsList && followingsList.length < 1 ? (
        <Nothing>팔로잉한 계정이 없습니다.</Nothing>
      ) : (
        <Pagination total={followingsList?.length as number} limit={limit} page={page} setPage={setPage} />
      )}
    </Wrapper>
  );
};

export default UserFollowing;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  border: 1px solid black;
  height: 100%;
  min-height: 640px;
  border: 1px solid ${({ theme }) => theme.colors.boxLine};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
  border-radius: 5px;
  position: relative;
  z-index: 5;
`;

const Title = styled.h2`
  padding: 1rem 1rem;
  margin-bottom: 0;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Nothing = styled.p`
  padding: 16px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const UserName = styled.span`
  padding-left: 1rem;
`;
