import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IChannel } from '../types/channel';
import { AiOutlineRight } from 'react-icons/ai';
import { END_POINT } from '../api/apiAddress';

interface Channel {
  _id: string;
  name: string;
}

const Channels = () => {
  const [channelList, setChannelList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getChannelList();
  }, []);

  const getChannelList = async () => {
    return await axios.get(`${END_POINT}/channels`).then(({ data }) => setChannelList(data));
  };

  const handleClickMoveChannel = (id: string) => {
    navigate(`/channel/${id}`);
  };
  const hobbyChannel = channelList.filter((channel: IChannel) => channel.description === '취미');
  const familyChannel = channelList.filter((channel: IChannel) => channel.description === '가족');
  const etcChannel = channelList.filter((channel: IChannel) => channel.description === '기타');
  return (
    <Wrapper>
      <Sidebar>
        <ChannelTitle>취미</ChannelTitle>
        <ChannelWrapper>
          {hobbyChannel.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
      <Sidebar>
        <ChannelTitle>가족</ChannelTitle>
        <ChannelWrapper>
          {familyChannel.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
      <Sidebar>
        <ChannelTitle>기타</ChannelTitle>
        <ChannelWrapper>
          {etcChannel.map(({ _id, name }: Channel) => (
            <Channel key={_id} onClick={() => handleClickMoveChannel(_id)}>
              {name}
              <AiOutlineRight />
            </Channel>
          ))}
        </ChannelWrapper>
      </Sidebar>
    </Wrapper>
  );
};

export default Channels;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
  position: fixed;
  margin-top: 7.6875rem;
  gap: 2rem;
`;

const Sidebar = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 15rem;
  min-height: 90px;
  height: 22%;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const ChannelWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #60606080;
    border-radius: 10px;
  }
`;
const ChannelTitle = styled.div`
  text-align: center;
  margin: 1rem 1rem 0.5rem 1rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primaryDark}80`};
  }
`;
