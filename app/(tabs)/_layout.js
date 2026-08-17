import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#0F1F17"
        },

        headerTintColor: "#F4F2E4",
        headerTintBackground: "#0F1F17",
        
        tabBarActiveTintColor: "#E0555F",
        tabBarInactiveTintColor: "#5F6B60",
        tabBarStyle: {
          backgroundColor: "#0F1F17",
          borderTopColor: "#182A21",
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />
    </Tabs>
  );
}
