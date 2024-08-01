"use client"

import {useEffect, useState} from "react";
import {Api} from "../../../../../shared/services/api-client";
import {IStory} from "../../../../../shared/services/stories";
import {Container} from "@/app/shared/components/shared/Container";
import {cn} from "../../../../../shared/lib/utils";
import {Skeleton} from "@/app/shared/components/ui";
import {X} from "lucide-react";
import ReactStories from 'react-insta-stories'


interface StoriesProps {
    className?: string;

}


export const Stories = ({className}: StoriesProps) => {


    const [stories, setStories] = useState<IStory[]>([])
    const [open, setOpen] = useState(false)
    const [selectedStory, setSelectedStory] = useState<IStory>()

    useEffect(() => {


        const fetchStories = async () => {
            const data = await Api.stories.getAll()
            console.log(data)
            setStories(data)
        }


        fetchStories()

    }, [])


    const onClickStory = (story: IStory) => {
        setSelectedStory(story)

        if (story.items.length > 0) {
            setOpen(true)
        }


    }

    const handleBackgroundClick = (e: any) => {
        if (e.target.className.includes('modal-background')) {
            setOpen(false);
        }
    };

    return (
        <div className={className}>

            <Container className={cn('flex items-center justify-between gap-2 my-10 ')}>

                {stories.length === 0 && Array.from({length: 6}).map((_, index) =>
                    <Skeleton className={'h-[250px] w-[250px]'} key={index}/>
                )}

                <>
                    {
                        stories?.map(story => (
                            <>
                                <img
                                    key={story.id}
                                    className={'rounded cursor-pointer'}
                                    height={195}
                                    width={195}
                                    onClick={() => onClickStory(story)}
                                    src={story.previewImageUrl}
                                />

                            </>


                        ))

                    }
                </>


                {open && (
                    <div onClick={handleBackgroundClick}
                         className={'absolute left-0 right-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30 modal-background'}>

                        <div className={'relative'} style={{width: 520}}>
                            <button className={'absolute -right-10 -top-5 z-30'} onClick={() => setOpen(false)}>
                                <X className={'absolute top-0 right-0 w-8 h-8 text-white/50'}/>
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map((item) => (
                                    {url: item.sourceUrl}
                                )) || []}
                                defaultInterval={3000}
                                width={520}
                                height={800}
                            />


                        </div>

                    </div>
                )}


            </Container>

        </div>
    );
};