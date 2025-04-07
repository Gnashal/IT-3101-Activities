import { useQuery, useSubscription } from "../../$node_modules/@apollo/client/index.js"
import { POSTS_SUBSCRIPTION, POST_FETCH } from "../server-client/GqlQuery"
import { useEffect, useState } from "../../$node_modules/@types/react/index.js"
import { PostsTable } from "./PostsTable"

export function MainView() {
    const { data: realtimeData } = useSubscription(POSTS_SUBSCRIPTION)
    const { data: fetchData, loading } = useQuery(POST_FETCH)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            if (fetchData) {
                setPosts(fetchData.posts)
            }
        } catch (err) {
            throw new Error(err)
        }
    }, [fetchData])

    useEffect(() => {
        try {
            if (realtimeData) {
                const newPost = realtimeData.postCreated;
                setPosts((prevPosts) => [...prevPosts, newPost]);
            }
        } catch (err) {
            throw new Error(err)
        }
    }, [realtimeData]);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <PostsTable posts={posts} />
        </>
    )
}