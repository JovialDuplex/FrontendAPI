
# Frontend-API
Ce depot est la partie frontend qui consomme l'api cree en python (avec fast API) et dont le role est de retirer du texte sur des images grace a l'IA et le remplacer par un fond blanc

# Autres Informations 
## Auteur: Jovial Duplex

## Comment sa fonctionne
Dans l'application vous allez uploader une image dont vous voulez replacer le text qui est dessus par un autre text ou par un fond banal selectionner par l'api. Donc 

### etape 1: Chargement de l'image
Vous Uploader votre image dans le champ concerner 

### etape 2 (facultative): Texte de remplacement
Vous allez ecrire dans le champ prevu a cet effet le text dont vous voulez remplacer dans votre image. si ce champ est vide lors du lancement de l'operation alors l'api selectionnera une image et le mettra comme replacement de tous les textes de l'image

### etape 3: Lancement du processus 
Vous lancer le processus de remplacement du texte en cliquant sur <strong> erase text </strong> et patienter le traitement. Et enfin une image vous sera retourner avec le texte de remplacer a l'interieur 

### etape 4 (facultative): Telechargement de l'image
Vous pouvez telecharger l'image si vous le desirez en cliquant sur <strong> Download Image </strong>

