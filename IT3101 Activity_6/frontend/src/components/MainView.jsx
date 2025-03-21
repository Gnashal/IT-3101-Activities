import { useSubscription } from "@apollo/client"
import POSTS_SUBSCRIPTION from "../server-client/GqlQuery"
import { useEffect, useState } from "react"
import { PostsTable } from "./PostsTable"

export function MainView() {
    const {data, loading} = useSubscription(POSTS_SUBSCRIPTION)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            if (data) {
                console.log("New post received:", data);
                const newPost = {
                    id: data.postCreated.id ,
                    title: data.postCreated.title,
                    content: data.postCreated.content
                };
                setPosts((prevPosts) => [...prevPosts, newPost]);
            }
        } catch (err) {
            throw new err
        }
    }, [data])

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <PostsTable posts={posts} />
        </>
    )
}