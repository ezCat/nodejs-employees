### API nodejs-employees

## Modélisation

La base de données MongoDB "nodejs-employees" possédera une seule collection 'collaborateurs'.

Dans cette collection, il y aura autant de document que de collaborateurs.

<code>
{
	id: 1,
	name: 'Michel',
	prenom: 'Maud',
	naissance: 21/07/1986,
	poste: 'DRH',
	salaire: 1600,
	date_entry: 13/07/2008,
	date_out: 13/07/2014,
	photo: null,
	numero_arrivee: 132567,
	mail: maud.michel@xyz.com
}
</code>

## Afficher la liste des employés

Il faut utiliser le verbe GET afin de récupérer des données.

## Saisir un utilisateur

L'ajout d'utilisateur se réalise à l'aide du formulaire, la redirection suite à l'ajout ne fonctionne cependant pas.