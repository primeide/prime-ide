'use client';

import styles from './WhatsAppFloat.module.css';

export default function WhatsAppFloat() {
    const phoneNumber = '917907373687';
    const message = 'Hi! I would like to know more about Prime IDE services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappFloat}
            aria-label="Contact us on WhatsApp"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.115-.198.058-.372-.029-.548-.087-.174-.78-1.88-1.07-2.572-.284-.68-.577-.587-.791-.598-.204-.01-.439-.012-.674-.012-.234 0-.615.089-.936.434-.322.347-1.229 1.192-1.229 2.908 0 1.716 1.258 3.374 1.432 3.611.173.237 2.476 3.774 5.996 5.297 2.38 1.03 3.292 1.05 4.492.835 1.03-.186 2.536-1.042 2.895-2.049.358-1.006.358-1.87.25-2.049-.109-.179-.407-.282-.704-.431zM12.023 21.846c-1.82 0-3.606-.49-5.17-1.424l-.37-.223-3.845 1.008 1.028-3.75-.24-.383c-1.018-1.62-1.554-3.5-1.554-5.42 0-5.432 4.418-9.85 9.85-9.85s9.85 4.418 9.85 9.85c.001 5.432-4.417 9.85-9.849 9.85z" />
            </svg>
        </a>
    );
}
