import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/appConfig';
import { Container, PostCard } from '../components/index';


const AllPosts = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        

    }, [])
    appwriteService.getPosts([]).then((postss) => {
        if (postss) {
            setPosts(postss.documents);
        }
    })


    return (
        <div className='w-full my-6'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts?.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>

        </div>
    )
}

export default AllPosts
