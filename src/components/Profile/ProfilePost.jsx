import ProfilePostModal from './ProfilePostModal';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="post-item" onClick={onOpen}>
        <div className="overlay-container">
          <div className="overlay-container-item">
            <AiFillHeart />
            <span>{post?.likes?.length}</span>
          </div>
          <div className="overlay-container-item">
            <FaComment />
            <span>{post?.comments?.length}</span>
          </div>
        </div>
        <img src={post?.imgURL} alt="imgage" />
      </div>

      <ProfilePostModal isOpen={isOpen} onClose={onClose} post={post} />
    </>
  );
};

export default ProfilePost;
