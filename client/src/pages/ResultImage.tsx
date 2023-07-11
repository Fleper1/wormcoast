import React, {useRef, useEffect, useState} from 'react';
import GridReaderService from "../api/GridReaderService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import {FileReader} from "../components/UI/FileReader/FileReader";


type Value = { value: number, index: number }

export default function ResultImage (){

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [values, setValues] = useState<Value[]>([]);
    const [formState, setFormState] = useState<FormData | null>(null);

    /*
        74, 92, 254 - very cold
        74, 254, 200 - not too much cold
        13, 253, 51 - normal
        205, 253, 13 - good
        253, 214, 13 - little hot
        253, 157, 13 - hot
    */

    const getColorForTemperature = (temperature: number): Array<number> => {
        if (27 < temperature && temperature < 35) {
            return [253, 157, 13]
        } else if (20 < temperature && temperature < 28) {
            return [253, 214, 13]
        } else if (14 < temperature && temperature < 21) {
            return [205, 253, 13]
        } else if (8 < temperature && temperature < 15) {
            return [13, 253, 51]
        } else if (2 < temperature && temperature < 9) {
            return [74, 254, 200]
        } else {
            return [74, 92, 254]
        }
    }

    const [fetchData, isLoading, isError] = useFetching(async (): Promise<any> => {
        if (!formState) return;
        const response = await GridReaderService.getGridData(formState);
        setValues(response.data || []);
    })

    const manipulateImage = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        const data = imageData.data;
        values.forEach((element) => {
            const colors = getColorForTemperature(element.value)
            data[element.index * 4] = colors[0];
            data[element.index * 4 + 1] = colors[1];
            data[element.index * 4 + 2] = colors[2];
        })
        context.putImageData(imageData, 0, 0);
    };

    useEffect((): void => {
        fetchData();
    }, [formState]);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const context = canvas?.getContext('2d');

        if (!context) {
            return;
        }

        const image = new Image();
        image.src = 'https://moweb.azureedge.net/careers/heat-map-task/empty-map.jpg'
        image.crossOrigin = 'Anonymous'

        if (canvas) {
            image.onload = () => {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                context.translate(0, canvas.height);
                context.scale(1, -1)
                context.drawImage(image, 0, 0);
                manipulateImage(context);
            }
        }
    }, [values])


    return (
        <div style={{
            minHeight: "100rex",
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}><>
            <FileReader setFormState={setFormState}/>
            {
                isLoading
                    ? <Loader/>
                    : <canvas style={{height: "100%", width: "100%", transform: "scaleY(-1)"}} ref={canvasRef}/>
            }
        </>
        </div>
    )
};
