import styles from './PageLayout.module.css';

export function PageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.pageLayout}>
      <header>
        <h1 className={styles.headerTitle}>{title}</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
