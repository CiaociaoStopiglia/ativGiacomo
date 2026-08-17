import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function Exemplo () {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>

                <Text styles={styles.eyebrow}>
                    DESENVOLVIMENTO 2 SEMESTRE
                </Text>

                <Text style={styles.title}>
                    O que vou estudar esse semestre
                </Text>

                <Text style={styles.description}>
                    Separei aqui os principais assuntos que vamos aprender.
                </Text>

                <Text style={styles.sectionTitle}>
                    assuntos
                </Text>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.number}>01</Text>
                        <Text style={styles.week}>Semana 1-2</Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Pastas do App
                    </Text>

                    <Text style={styles.cardDescription}>
                        Como organizar as telas e arquivos do projeto.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.number}>01</Text>
                        <Text style={styles.week}>Semana 1-2</Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Pastas do App
                    </Text>

                    <Text style={styles.cardDescription}>
                        Como organizar as telas e arquivos do projeto.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.number}>01</Text>
                        <Text style={styles.week}>Semana 1-2</Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Pastas do App
                    </Text>

                    <Text style={styles.cardDescription}>
                        Como organizar as telas e arquivos do projeto.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.number}>01</Text>
                        <Text style={styles.week}>Semana 1-2</Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Pastas do App
                    </Text>

                    <Text style={styles.cardDescription}>
                        Como organizar as telas e arquivos do projeto.
                    </Text>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F1F17"
    },

    content: {
        padding: 24,
        paddingTop: 64,
        paddingBottom: 48,
    },

    eyebrow: {
        color: "#E0555F",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 14,
    },

    title: {
        color: "#F4F2E4",
        fontSize: 32,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 14,
    },

    title: {
        color: "#F4F2E4",
        fontSize: 32,
        fontWeight: "700",
        lineHeight: 38,
        marginBottom: 14,
        letterSpacing: -0.5,
    },

    description: {
        color: "#8E9488",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 40,
    },

    sectionTitle: {
        color: "#F4F2E4",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        letterSpacing: -0.2,
    },

    card: {
        backgroundColor: "#182A21",
        borderRadius: 18,
        padding: 20,
        fontSize: 32,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        gap: 10,
    },

    numberBadge: {
        backgroundColor: "rgba(224, 85, 95, 0.15)",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },

    number: {
        color: "#E0555F",
        fontSize: 12,
        fontWeight: "800",
    },

    week: {
        color: "#5F6B60",
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 0.3,
    },

    cardTitle: {
        color: "#F4F2E4",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 6,
    },

    cardDescription: {
        color: "#8E9488",
        fontSize: 13.5,
        lineHeight: 20,
    }
})