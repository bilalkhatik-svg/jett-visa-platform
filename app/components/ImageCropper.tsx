import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "../design-system/ui";
import type { Area, Point } from "react-easy-crop";

export type CropMode = "banner" | "card";

export interface ImageCropperProps {
  image: string;
  mode: CropMode;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

const CROP_CONFIG = {
  banner: {
    aspect: 2 / 1, // 2:1 ratio
    outputWidth: 2400,
    outputHeight: 1200,
    label: "Banner Image",
    dimensions: "2400 x 1200 px",
  },
  card: {
    aspect: 4 / 5, // 4:5 ratio
    outputWidth: 800,
    outputHeight: 1000,
    label: "Card Thumbnail",
    dimensions: "800 x 1000 px",
  },
};

// Helper function to create image from blob
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

// Helper function to get cropped image
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number,
  outputHeight: number
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve(url);
      },
      "image/jpeg",
      0.95
    );
  });
};

export default function ImageCropper({
  image,
  mode,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const config = CROP_CONFIG[mode];

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropAreaChange = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropComplete = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        config.outputWidth,
        config.outputHeight
      );
      onCropComplete(croppedImage);
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Crop {config.label}
              </h3>
              <p className="text-sm text-gray-600">{config.dimensions}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden mb-4">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={config.aspect}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropAreaChange}
              restrictPosition={true}
              minZoom={1}
              maxZoom={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zoom
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onCancel} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handleCropComplete}
              disabled={isProcessing || !croppedAreaPixels}
            >
              {isProcessing ? "Processing..." : "Apply Crop"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

