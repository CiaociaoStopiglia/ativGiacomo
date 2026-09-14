import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_cDgFpQYN_oTZYKV-kLfL8EBUwcZKKQgsYC8m9T1aCyXv9mjin604q0g3AdXfINsZ";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

 async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
        const resposta = await api.get("/api/jogos", {
            params: { limit: 50 },
        });
        setJogos(resposta.data.data);
    } catch (e) {
        setErro("Não foi possivel carregar os jogos. Tenta de novo em instantes")
    } finally {
        setCarregando(false);
    }
  }

  useEffect(() => {
      buscarJogos()
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.conteudo}>
            <View style={styles.header}>
              <Text style={styles.tituloPagina}>Catálogo de Jogos</Text>
              <Text style={styles.subtitulo}>GET & POST /api/jogos</Text>
            </View>

            <Text style={styles.secao}>Jogos cadastrados ({jogos.length})</Text>
  
          {carregando && <ActivityIndicator style={{ marginVertical: 16 }} color="#1565c0" />}
          {erro && <Text style={styles.erro}>{erro}</Text>}
  
          {!carregando &&
          jogos.map((item) => (
              <View key={item.id} style={styles.card}>
                  <Image
                  source={{
                      uri: item.imageUrl || "https://via.placeholder.com/64",
                  }}
                  style={styles.imagem}
                  />
                  <View style={styles.info}>
                      <Text style={styles.titulo}>{item.title}</Text>
                      <Text style={styles.categoria}>
                          {item.categoria || item.plataforma || "Sem categoria"}
                          {item.desenvolvedora ? `${item.desenvolvedora}` : ""}
                      </Text>
                  </View>
              </View>
          ))}
          </ScrollView>
          </SafeAreaView>
      )
  }

  const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#f88e65" },
  subtitulo: { fontSize: 14, color: "#9b6648", marginTop: 2 },
  secao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e26d3e",
    marginTop: 12,
    marginBottom: 8,
  },
  erro: { color: "#c62828", marginTop: 12 },
  rotulo: { fontSize: 13, fontWeight: "600", color: "#faf8f8", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#f88e65",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  botaoTexto: { color: "white", fontWeight: "700" },
  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: { width: 64, height: 64 },
  info: { flex: 1, justifyContent: "center", paddingRight: 12 },
  titulo: { fontSize: 16, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#64748b" },
});