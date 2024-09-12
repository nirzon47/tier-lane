# Tier Lane

## What is it?

A tier list website made for the Azur Lane community!

## Why did I make it?

I am in a gacha community and some people asked me to and I had time.

Now I do not have the time but I like this project because of the absurd amount of data it has (Why are there like 700+ characters???), I need to manage it wisely and that's a challenge I enjoy.

## Steps to update assets

In case you want to contribute or I develop [dementia](https://www.youtube.com/watch?v=W-po1PMtJJo&pp=ygUObWUgdnMgZGVtZW50aWE%3D).

1. Head over to the [assets repo](https://github.com/nirzon47/projects-assets/tree/main/azur-lane).
2. Install the dependencies from the root folder.
3. Copy new assets ([more on this below](#get-the-new-assets)) and move them to the `scrambled` folder, skip already existing assets by sorting by date.
4. Do a manual checkup for the operations you perform. It's needed.
5. Get the new assets, copy them to a new temporary folder.
6. Get the `groupInFolders.js` script from `utils` folder and drop it in temporary folder.
7. Run the script you just copied.
8. Repeat the process with `renameFolders.js` script in `utils` folder.
9. Copy the script `generateJSON.js` and run it. It will ask for many things, make sure to fill them correctly. Abbreviations and short forms are in the code if you want to make things fast.
10.   After you have run it, you will have a new JSON file, copy the old `shiplist.json` in the same directory.
11.   After having both the JSON files, run the script `mergeShiplists.js` to merge them. !! RUN ONLY ONCE !! or there will be duplication.

## Get the new assets

As of 12th September 2024, after the Amagnii event, the new assets are in `Android/data/com.YoStarEn.AzurLane`

-  Inside `files`, you will find the `AssetBundles` folder.
-  You will find many folders there but according to the scope of the project, we are only concerned with `squareicon` folder.
-  Copy the files, now you will notice that you cannot access the files. To do that, we need to download this [tool](https://github.com/Perfare/AssetStudio)
-  Load the folder in which you have copied the files and then export filtered assets and you are done.

## Why are so many commits unverified?

I switch device very often and sometimes I reset them too.

And I don't backup my GPG keys because I never think I would end up switching devices or resetting them.
