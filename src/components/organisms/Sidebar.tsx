import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SidebarWrapper from "../ui/SidebarWrapper";
import HikeCard from "./HikeCard";

const hikeData = {
    data: {
        id: 31,
        title: "Cascade du Nideck\nActions",
        excerpt:
            "<p>Cascade du Nideck, Ruines du Ch\u00e2teau du Nideck, Schneeberg, Ruines du Petit Ringelsberg, Ruines du Grand Rengelsberg.</p>",
        description:
            '<p>D\u00e9part du parking pr\u00e8s du gymnase d\'<a href="https://www.visorando.com/randonnee-oberhaslach.html">Oberhaslach</a>.</p>\n<p>(<strong style="color: red;">D/A</strong>) Du parking, on prend le balisage du Club Vosgien, disque et triangle Bleu. On s\'engage sur le Gr53, rectangle Rouge jusqu\'\u00e0 la D218.</p>\n<p>(<strong style="color: red;">1</strong>) Continuer le GR<sup>\u00ae</sup>53 (rectangle Rouge) jusqu\u2019\u00e0 la <a href="https://www.visorando.com/randonnee-cascade-du-nideck.html">Cascade du Nideck</a>. Site en porphyre rouge, d\u00e9rive d\'anciennes laves r\u00e9sultant d\'anciennes \u00e9ruptions volcaniques.</p>\n<p>(<strong style="color: red;">2</strong>) Ensuite on monte par un sentier qui vient de se d\u00e9gager et que le Club Vosgien vient de r\u00e9am\u00e9nager pour rejoindre un point de vue et le Ch\u00e2teau du Nideck.</p>\n<p>(<strong style="color: red;">3</strong>) Du Ch\u00e2teau, on rejoint la Maison Foresti\u00e8re du Nideck par le balisage cercle Bleu (GR<sup>\u00ae</sup>532). C\'est mieux que de suivre le GR<sup>\u00ae</sup>53 qui suit la route.</p>\n<p>(<strong style="color: red;">4</strong>) Ensuite on traverse la route pour r\u00e9cup\u00e9rer le GR<sup>\u00ae</sup>53 (rectangle Rouge) sur votre gauche, jusqu\'au sommet du Schneeberg o\u00f9 se trouve un beau point de vue sur le Rocher de Dabo et une table d\'orientation.<br>\nVous \u00eates \u00e0 la moiti\u00e9 de la randonn\u00e9e et vous avez mont\u00e9 800 m de d\u00e9nivel\u00e9 positif.</p>\n<p>(<strong style="color: red;">5</strong>) Pour le retour, le balisage croix Rouge vous am\u00e8ne au carrefour des Pandours par une descende bucolique.</p>\n<p>(<strong style="color: red;">6</strong>) Passage devant le <a href="https://www.visorando.com/randonnee-refuge-schneeberg.html">Refuge du Schneeberg</a>.</p>\n<p>(<strong style="color: red;">7</strong>) Balisage rectangle Blanc-Jaune-Blanc qui se dirige vers le carrefour Anlagen.</p>\n<p>(<strong style="color: red;">8</strong>) Petite attention, \u00e0 ce carrefour, il faut partir \u00e0 droite sur 30 m pour prendre \u00e0 gauche le sentier balis\u00e9 d\'un cercle Bleu et qui vous am\u00e8ne par une petite mont\u00e9e au Petit Ringelsberg.</p>\n<p>(<strong style="color: red;">9</strong>) Depuis les ruines du <a href="https://www.visorando.com/randonnee-chateau-du-petit-ringelstein.html">ch\u00e2teau du Petit Ringelstein</a>.</p>\n<p>(<strong style="color: red;">10</strong>) Monter vers Grand Ringelsberg, prenez le temps de monter au point culminant de la tour (sans prendre de risque) pour une vue superbe sur le plaine d\'Alsace.</p>\n<p>(<strong style="color: red;">11</strong>) Le sentier descend tranquillement jusqu\u2019\u00e0 un petit carrefour, lieu de d\u00e9bardage. L\u00e0 aussi, petite attention pour prendre le sentier sur votre gauche. Son amorce a \u00e9t\u00e9 un peu bouscul\u00e9e par les travaux de d\u00e9bardage.</p>\n<p>(<strong style="color: red;">12</strong>) Arriv\u00e9 en bas du sentier vous prenez \u00e0 droite pour rejoindre Oberhaslach et vos v\u00e9hicules (<strong style="color: red;">D/A</strong>).</p>',
        activity_type: "Randonn\u00e9e P\u00e9destre",
        difficulty: "Moyenne",
        distance: 19410,
        duration: "8h\u200900",
        positive_elevation: 861,
        negative_elevation: 861,
        municipality: "Oberhaslach\u00a0(67280)",
        highest_point: 948,
        lowest_point: 273,
        latitude: 48.550433,
        longitude: 7.324026,
        ign_reference: "Ref. 3715OT, 3716ET, 3716ETR",
        hike_url: "https://www.visorando.com/randonnee-cascade-du-nideck/",
        gpx_url:
            "https://tzwfwrcaliymtgsfkfot.supabase.co/storage/v1/object/public/gpx_storage/gpx/visorando-cascade-du-nideck.gpx",
        is_return_starting_point: true,
        images: [
            {
                id: 117,
                image_url:
                    "https://www.visorando.com/images/thumbnail/t-ruine-du-nideck-visorando-14077.jpg?mtrt=1708010291",
            },
            {
                id: 118,
                image_url:
                    "https://www.visorando.com/images/thumbnail/t-cascade-du-nideck-visorando-14072.jpg?mtrt=1708010293",
            },
            {
                id: 119,
                image_url:
                    "https://www.visorando.com/images/thumbnail/t-ruine-du-nideck-visorando-14077.jpg?mtrt=1708010295",
            },
        ],
    },
};

const Sidebar = () => {
    const isSidebarOpened = useSelector(
        (state: RootState) => state.sidebar.isOpen
    );

    return (
        <>
            <aside
                className={`pt-14 pb-16 w-[35vw] bg-white transition-all h-screen ${
                    isSidebarOpened ? "mr-0" : "-mr-[35%]"
                }`}
            >
                <SidebarWrapper>
                    <HikeCard hike={hikeData.data} />
                </SidebarWrapper>
            </aside>
        </>
    );
};

export default Sidebar;
