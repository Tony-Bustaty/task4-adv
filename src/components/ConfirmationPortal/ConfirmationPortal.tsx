import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import "./ConfirmationPortal.css"
import Button from '../Button/Button';
interface ConfirmationPortalProps{
    isOpen:boolean,
    onConfirm:()=>void,
    onCancel:()=>void,
    title?:string,
    message:string,
    confirmText:string,
    cancelText:string,
confirmButtonClassName?:string,
cancelButtonClassName?:string,
loading:boolean
}
const ConfirmationPortal = ({
  isOpen,
  onConfirm = () => {},
  onCancel = () => {},
  title ,
  message = 'Are you sure you want to proceed?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  loading = false,
}:ConfirmationPortalProps) => {
  const dialogRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  // Lock background scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Fallback to body if portal root doesn't exist
  const portalRoot = document.getElementById('confirmation-portal') || document.body;

  return ReactDOM.createPortal(
    <div className="confirmation-overlay" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {title && <h2 id="confirmation-title">{title}</h2>}
        <p className='message'>{message}</p>
        <div className="confirmation-buttons">
            <div style={{width:"20rem"}}>
    <Button content={confirmText} type='button'isLoading={loading} onClick={onConfirm}/>
            </div>
            <div style={{width:"20rem"}}>

            <Button content={cancelText} type='button' onClick={onCancel}/>
            </div>
        
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default ConfirmationPortal;