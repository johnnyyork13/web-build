import { useEffect } from "react";

export default function Website(props: {generatedContent: string, image: string}) {

    function addImageToImageTag() {
        const imageTag = document.querySelector("img");
        if (imageTag) {
            imageTag.src = props.image;
        }
    }

    useEffect(() => {
        addImageToImageTag();
    }, [props.image, props.generatedContent])

    return (
        <div dangerouslySetInnerHTML={{__html: props.generatedContent}}></div>
    )
}