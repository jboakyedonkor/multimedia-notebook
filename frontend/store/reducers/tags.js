import { SET_FAVORITE_TAGS, UPDATE_TAG, SET_POPULAR_TAGS, DELETE_POPULAR_TAG } from '../actions/tags';
import Tag from '../../models/tag'


const initialState = {
    popularTags: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_POPULAR_TAGS:
            return {
                ...state,
                popularTags: action.popularTags
            };

        case DELETE_POPULAR_TAG:
            return {
                ...state,
                popularTags: state.popularTags.filter(
                    tag => tag.name !== action.name
                )
            };

        case UPDATE_TAG:
            const updatedTag = new Tag(
                action.tagData.name,
                action.tagData.favorite,
                action.tagData.popularity,
                action.tagData.created_at,
                action.tagData.accessed_at
            );

            //try to find it in popular tag
            const tagIndex = state.popularTags.findIndex(
                tag => tag.name === action.tagData.name
            );

            //if found, the update
            const updatedPopularTags = [...state.popularTags];
            if (tagIndex >= 0) {
                updatedPopularTags[tagIndex] = updatedTag;
            }

            return {
                ...state,
                popularTags: updatedPopularTags,
            };

    }
    return state;

};  