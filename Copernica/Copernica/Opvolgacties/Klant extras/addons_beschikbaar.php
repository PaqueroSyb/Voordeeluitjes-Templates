{capture assign="bookedAddons"}{$Addons|lower}{/capture}
{loadprofile source="Extras_feed" Extra_ID={$PackageID} assign=geladenextras multiple=true}
{loadprofile source="Hotel_feed" Package_ID={$PackageID} assign=geladenhotels multiple=true}
{capture assign="items"}0{/capture}
{foreach $geladenhotels as $gh}
{capture assign="PackageIsDiner"}
{if $gh.Package_Name|strstr:'Halfpension' ||$PackageTitle|strstr:'halfpension' || $PackageTitle|strstr:'All inclusive' || $PackageTitle|strstr:'all inclusive'}
Yes{/if}
{/capture}
{/foreach}
{foreach $geladenextras as $ge}
{capture assign="ExtraDiner"}
{if $ge.Extra_name|strstr:'diner' || $ge.Extra_name|strstr:'3-' || $ge.Extra_name|strstr:'menu' || $ge.Extra_name|strstr:'buffet' || $ge.Extra_name|strstr:'gangen' ||
$ge.Extra_name|strstr:'keuze'}
Yes{/if}
{/capture}
{capture assign="PackageDinerExtraDiner"}
{if $PackageIsDiner == "Yes" && $ExtraDiner == "Yes"}
Yes
{else}
No{/if}
{/capture}
{if $ge.Show_extra == "Yes" && $PackageDinerExtraDiner == "No"}
{capture assign="addonLower"}
{$ge.Extra_name|lower}
{/capture}
{assign var="checkAddons" value=" "|explode:$addonLower}
{if !$bookedAddons|strstr:$checkAddons[0] && !$bookedAddons|strstr:$checkAddons[1]}
{capture assign="items"}
{math equation="x + y" x=$items y=1}
{/capture}{/if}{/if}{/foreach}{$items}