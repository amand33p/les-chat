import { useQuery } from '@apollo/client';
import {
  GET_ALL_USERS,
  GET_GROUPS,
  GET_GLOBAL_GROUP,
} from '../graphql/queries';

const RecentMessages = () => {
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: groupData, loading: loadingGroups } = useQuery(GET_GROUPS, {
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: globalData, loading: loadingGlobal } = useQuery(
    GET_GLOBAL_GROUP,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  if (loadingUsers || loadingGroups || loadingGlobal || !userData) {
    return <div>loading...</div>;
  }

  console.log(userData);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default RecentMessages;
