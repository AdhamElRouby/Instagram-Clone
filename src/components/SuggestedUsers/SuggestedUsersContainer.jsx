import SuggestedUsersHeader from './SuggestedUsersHeader';
import SuggestedUser from './SuggestedUser';
import SuggestedUserSkeleton from './SuggestedUserSkeleton';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import { Text } from '@chakra-ui/react';
import './SuggestedUsersContainer.scss';

const SuggestedUsers = () => {
  const { suggestedUsers, loading } = useGetSuggestedUsers();

  return (
    <div className="suggested-users-container">
      <SuggestedUsersHeader />

      {suggestedUsers.length !== 0 && (
        <div className="secondary-header">
          <Text fontSize={12} fontWeight={'bold'} color={'gray'}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={'bold'}
            _hover={{ color: 'gray.400' }}
            cursor={'pointer'}
          >
            See All
          </Text>
        </div>
      )}

      {loading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <SuggestedUserSkeleton key={idx} />
        ))}
      {!loading &&
        suggestedUsers.map((user) => (
          <SuggestedUser key={user.id} user={user} />
        ))}

      <div className="footer">
        &#169; {new Date().getFullYear()} Built By{' '}
        <a target="_blank" href="https://www.github.com/adhamelrouby">
          Adham El-Rouby
        </a>
      </div>
    </div>
  );
};

export default SuggestedUsers;
