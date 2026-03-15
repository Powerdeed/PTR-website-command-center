import Button from "@global components/ui/Button";

type AssetHandlingErrorProps = {
  errorMessage: string;
  handleReUpload: () => void;
};

export default function AssetHandlingError(props: AssetHandlingErrorProps) {
  return (
    <div className="feature-container-vertical h-full grid items-center justify-center text-style__body text-center">
      {props.errorMessage}

      <Button buttonText="Re-upload file" clickAction={props.handleReUpload} />
    </div>
  );
}
