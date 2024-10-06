import { EntityManager } from 'typeorm';

export interface ITransactionManager {
    /**
     * トランザクションを開始し、指定されたコールバック内で処理を実行します
     * @param work トランザクション内で実行する処理
     */
    begin<T>(work: (entityManager: EntityManager) => Promise<T>): Promise<T>;
}
