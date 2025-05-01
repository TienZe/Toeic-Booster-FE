import { useQuery } from "@tanstack/react-query";
import { getAllCollectionTags } from "../features/shared-apis/collection-tag-api";

export default function useCollectionTags() {
    return useQuery({
        queryKey: ["collectionTags"],
        queryFn: () => {
            return getAllCollectionTags();
        }
    })
}