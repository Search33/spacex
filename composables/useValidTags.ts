
interface Tag {
    id: number;
    imgSrc: string;
    text: string;
  }
  
  interface Launch {
    tags?: { id: number }[];
  }
  
export const useValidTags = (launches: Ref<any>) => {
    const { tagMap } = useProviders()


    const validTags = computed(() => {
        if (launches.value && launches.value.result) {
            return launches.value.result.map((launch: Launch) => {
                return launch.tags?.map(tag => {
                    const tagMapEntry = tagMap[tag.id];
                    return tagMapEntry ? {
                        id: tag.id,
                        imgSrc: tagMapEntry.imgSrc,
                        text: tagMapEntry.text,
                    } : null;
                }).filter((tag): tag is Tag => tag !== null) || []
            });
        } else {
            return [];
        }
    });
    return { validTags }
}