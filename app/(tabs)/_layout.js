import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#0F1F17",
        },
        headerTintColor: "#F4F2E4",
        headerTintBackground: "#0F1F17",
        tabBarActiveTintColor: "#E0555F",
        tabBarInactiveTintColor: "#5F6B60",
        tabBarStyle: {
          backgroundColor: "#0F1F17",
          borderTopColor: "#182A21",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jogos-criar"
        options={{
          title: "Criar Jogo",
          headerTitle: "Cadastrar Jogo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jogos-lista"
        options={{
          title: "Lista",
          headerTitle: "Catálogo de Jogos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔴 Aba de Excluir com o Ícone da Lixeira */}
      <Tabs.Screen
        name="jogos-deletar"
        options={{
          title: "Excluir",
          headerTitle: "Excluir Jogo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trash-outline" size={size} color={color} /> // 👈 Botão de deletar aqui
          ),
        }}
      />

      {/* Rotas ocultas da barra inferior */}
      <Tabs.Screen name="aulas" options={{ href: null }} />
      <Tabs.Screen name="filmes" options={{ href: null }} />
      <Tabs.Screen name="interface" options={{ href: null }} />
    </Tabs>
  );
}