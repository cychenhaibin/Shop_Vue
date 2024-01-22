import {getBannerAPI} from "@/apis/home.js";

export function useBanner() {
    // 轮播图
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI('2')
        bannerList.value = res.result
    }
    onMounted(() => getBanner())
    return {
        bannerList
    }
}