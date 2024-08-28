import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

const Post = ({ post }) => {
  const { loading, userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <div className="post-container">
      {!loading && <PostHeader createdAt={post.createdAt} userProfile={userProfile} />}
      <div className="post-img-container">
        <img src={post.imgURL} alt={`Post Image`} />
      </div>
      {!loading && <PostFooter post={post} userProfile={userProfile} />}
    </div>
  );
};

export default Post;
