import { business } from "@/content/business";
import styles from "./StreetSign.module.css";

/**
 * O endereço desenhado como as placas de rua de São Paulo.
 * É texto real, lido normalmente por leitores de tela.
 */
export function StreetSign() {
  const { address } = business;
  const streetName = address.street.replace(/^R\.\s*/, "");

  return (
    <p className={styles.sign}>
      <span className={styles.kind}>Rua</span>
      <span className={styles.street}>
        {streetName}, <span className={styles.number}>{address.number}</span>
      </span>
      <span className={styles.meta}>
        <span>{address.neighborhood}</span>
        <span aria-hidden="true" className={styles.dot} />
        <span>CEP {address.postalCode}</span>
      </span>
    </p>
  );
}
