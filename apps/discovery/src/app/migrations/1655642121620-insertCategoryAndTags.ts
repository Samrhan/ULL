import {MigrationInterface, QueryRunner} from "typeorm";

export class insertCategoryAndTags1655642121620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('insert into category (category_name, popular, category_picture, category_description, created_at, updated_at)\n' +
            'values  (\'Traiteur\', true, \'caterer.jpg\', \'description\', \'2022-06-15 14:54:35.386546\', \'2022-06-15 14:54:35.386546\'),\n' +
            '        (\'Éducation\', false, \'education.jpg\', \'description\', \'2022-06-15 14:55:49.418146\', \'2022-06-15 14:55:49.418146\'),\n' +
            '        (\'Musicien\', true, \'musician.jpg\', \'description\', \'2022-06-15 14:54:35.354620\', \'2022-06-15 14:54:35.354620\'),\n' +
            '        (\'Photographe\', true, \'photographer.png\', \'description\', \'2022-06-15 14:55:49.445427\', \'2022-06-15 14:55:49.445427\'),\n' +
            '        (\'Marketing\', false, \'marketing.jpg\', \'description\', \'2022-06-15 14:55:49.387992\', \'2022-06-15 14:55:49.387992\'),\n' +
            '        (\'Logistique\', false, \'logistic.jpg\', \'description\', \'2022-06-15 14:55:49.436480\', \'2022-06-15 14:55:49.436480\'),\n' +
            '        (\'Locataire de salle\', true, \'room_rental.jpg\', \'description\', \'2022-06-15 14:55:49.353222\', \'2022-06-15 14:55:49.353222\'),\n' +
            '        (\'Projection\', false, \'projection.jpg\', \'description\', \'2022-06-15 14:55:49.364318\', \'2022-06-15 14:55:49.364318\'),\n' +
            '        (\'Spectacle vivant\', false, \'spectacle.jpg\', \'description\', \'2022-06-15 14:55:49.407806\', \'2022-06-15 14:55:49.407806\'),\n' +
            '        (\'Animateur de salle\', false, \'animator.jpg\', \'description\', \'2022-06-15 14:54:35.400526\', \'2022-06-15 14:54:35.400526\'),\n' +
            '        (\'Sécurité\', true, \'security.jpg\', \'description\', \'2022-06-15 14:55:49.427306\', \'2022-06-15 14:55:49.427306\'),\n' +
            '        (\'Santé\', false, \'health.jpg\', \'description\', \'2022-06-15 14:55:49.397271\', \'2022-06-15 14:55:49.397271\');')
        await queryRunner.query('insert into tag (tag_name)\n' +
            'values  (\'Orchestre\'),\n' +
            '        (\'Groupe indé\'),\n' +
            '        (\'Régisseur\'),\n' +
            '        (\'Ingénieur du son\'),\n' +
            '        (\'Fanfare\'),\n' +
            '        (\'Chanteur\'),\n' +
            '        (\'Musicien solo\'),\n' +
            '        (\'DJ\'),\n' +
            '        (\'Cuisine Italienne\'),\n' +
            '        (\'Cuisine Française\'),\n' +
            '        (\'Cuisine Japonaise\'),\n' +
            '        (\'Cuisine Mexicaine\'),\n' +
            '        (\'Cuisine Coréenne\'),\n' +
            '        (\'Cuisine Espagnole\'),\n' +
            '        (\'Cuisine Grecque\'),\n' +
            '        (\'Cuisine Turque\'),\n' +
            '        (\'Cuisine Thaï\'),\n' +
            '        (\'Cuisine Chinoise\'),\n' +
            '        (\'Cuisine Indienne\'),\n' +
            '        (\'Cuisine Orientale\'),\n' +
            '        (\'Cuisine Africaine\'),\n' +
            '        (\'Cuisine Antillaise\'),\n' +
            '        (\'Salle des fêtes\'),\n' +
            '        (\'Salle de spectacle\'),\n' +
            '        (\'Monument historique\'),\n' +
            '        (\'Terrain particulier\'),\n' +
            '        (\'Parc\'),\n' +
            '        (\'Château\'),\n' +
            '        (\'Cinéma en plein air\'),\n' +
            '        (\'Cinéma classique\'),\n' +
            '        (\'Loueur d’écrans\'),\n' +
            '        (\'Style moderne\'),\n' +
            '        (\'Style contemporain\'),\n' +
            '        (\'Style minimaliste\'),\n' +
            '        (\'Style industriel\'),\n' +
            '        (\'Style scandinave\'),\n' +
            '        (\'Style traditionnel\'),\n' +
            '        (\'Style campagne\'),\n' +
            '        (\'style bohème\'),\n' +
            '        (\'Style Rustique\'),\n' +
            '        (\'Style Zen\'),\n' +
            '        (\'Tournage de publicité\'),\n' +
            '        (\'Influenceur\'),\n' +
            '        (\'Designeur graphique\'),\n' +
            '        (\'Artiste graphique\'),\n' +
            '        (\'Pompier\'),\n' +
            '        (\'Ambulancier\'),\n' +
            '        (\'Théâtre\'),\n' +
            '        (\'Danse\'),\n' +
            '        (\'Opéra\'),\n' +
            '        (\'Troupe d’art moderne\'),\n' +
            '        (\'Intervenant\'),\n' +
            '        (\'Universitaire\'),\n' +
            '        (\'Encadrant\'),\n' +
            '        (\'Professeur\'),\n' +
            '        (\'Sécurité privé\'),\n' +
            '        (\'Police\'),\n' +
            '        (\'Gendarmerie\'),\n' +
            '        (\'Location de camionnette/camion\'),\n' +
            '        (\'Déménageur\'),\n' +
            '        (\'Livraison\'),\n' +
            '        (\'Amateur\'),\n' +
            '        (\'Professionnel\'),\n' +
            '        (\'Agence\'),\n' +
            '        (\'Equipe de capture\'),\n' +
            '        (\'Drone\'),\n' +
            '        (\'Retransmission en direct\');')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM categoy')
        await queryRunner.query('DELETE FROM tag')
    }

}
