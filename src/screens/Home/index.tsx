import React, { useState } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { Profile } from "../../components/Profile";
import { Appointment } from "../../components/Appointment";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { CategorySelect } from "../../components/CategorySelect";
import { Background } from "../../components/Background";
import { FAQ } from "constants/faq";

import { styles } from "./styles";
import { useAuth } from "hooks/auth";
import { ExpandableComponent } from "components/ExpandableComponent";
import { User } from "components/User";

type Props = {};

type Item = {
  id: string;
  guild: {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
  };
  category: string;
  date: string;
  description: string;
};

export function Home({}: Props) {
  const [category, setCategory] = useState("1");
  const [isOwnerSearch, setIsOwnerSwitch] = useState<boolean>(false);
  const { user } = useAuth();

  const { navigate } = useNavigation();

  const toggleSwitch = (status: boolean) => {
    setIsOwnerSwitch(status);
  };

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(item: Item) {
    navigate("AppointmentDetails", {
      item,
    });
  }
  function handleAppointmentDetailsSearch(item: Item) {
    navigate("AppointmentDetailsSearch", {
      item,
    });
  }

  function handleAppointmentCreate() {
    navigate("AppointmentCreate");
  }

  function renderSearch() {
    const search = [
      {
        id: "1",
        guild: {
          id: "1",
          name: "Identifcação de objetos em pessoas através de sistemas embarcados",
          icon: "https://i.pinimg.com/736x/07/c7/51/07c751e62cc9363d20d181b7a87857d3.jpg",
          owner: true,
        },
        category: "2",
        date: "22/06 ás 20:40h",
        description: "Traga seus amigos, vamos aprender mais sobre o cinema :)",
      },
    ];

    const users = [
      {
        id: "1",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
      {
        id: "2",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
      {
        id: "3",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
      {
        id: "4",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
      {
        id: "5",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
    ];
    return (
      <>
        <ListHeader title="Pesquisa ciêntifica" subtitle="Total 6" />
        {!isOwnerSearch ? (
          <FlatList
            data={search}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetailsSearch(item)}
              />
            )}
            style={styles.matches}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        ) : (
          <>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <User data={item} onPress={() => {}} />}
              style={styles.matches}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
            />
          </>
        )}
        <View style={styles.switchSearch}>
          <RectButton onPress={() => toggleSwitch(true)}>
            <Text style={styles.title}>Conexões</Text>
          </RectButton>
          <View style={styles.separtorView} />
          <RectButton onPress={() => toggleSwitch(false)}>
            <Text style={styles.title}>Meus grupos</Text>
          </RectButton>
        </View>
      </>
    );
  }

  function renderStudy() {
    const study = [
      {
        id: "1",
        guild: {
          id: "1",
          name: "Cinema",
          icon: "https://i.pinimg.com/736x/07/c7/51/07c751e62cc9363d20d181b7a87857d3.jpg",
          owner: true,
        },
        category: "2",
        date: "22/06 ás 20:40h",
        description: "Traga seus amigos, vamos aprender mais sobre o cinema :)",
      },
      {
        id: "2",
        guild: {
          id: "1",
          name: "Geek",
          icon: "https://cdn.leroymerlin.com.br/products/kit_10_placas_decorativas_mdf_frases_nerd_geek_1566757612_de11_600x600.jpeg",
          owner: true,
        },
        category: "2",
        date: "22/06 ás 20:40h",
        description:
          "Curte Star Wars, Senhor dos Anéis, cultura Geek de maneira geral ? então chega mais!",
      },
      {
        id: "3",
        guild: {
          id: "1",
          name: "Futebol",
          icon: "https://s2.static.brasilescola.uol.com.br/be/conteudo/images/jogo-de-futebol.jpg",
          owner: true,
        },
        category: "2",
        date: "22/06 ás 20:40h",
        description: "Que bater uma resenha sobre futebol? só chegar",
      },
    ];

    return (
      <>
        <ListHeader title="Grupo de Estudos" subtitle="Total 6" />
        <FlatList
          data={study}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }
  function renderSports() {
    const sports = [
      {
        id: "1",
        guild: {
          id: "1",
          name: "Vôlei",
          icon: "https://mrvnoesporte.com.br/wp-content/uploads/2017/09/123748-6-curiosidades-sobre-o-volei-que-voce-precisa-conhecer.jpg",
          owner: true,
        },
        category: "4",
        date: "22/06 ás 20:40h",
        description: "Volêi feminino e masculino",
      },
    ];

    return (
      <>
        <ListHeader title="Esportes" subtitle="Total 6" />
        <FlatList
          data={sports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }

  function renderStudentEngagement() {
    const studentEngagement = [
      {
        id: "1",
        guild: {
          id: "1",
          name: "Debate sobre Representatividade",
          icon: "http://jornalcobaia.com.br/wp-content/uploads/2018/10/Arte-Espelho-Meu-624x275.jpg",
          owner: true,
        },
        category: "3",
        date: "22/06 ás 20:40h",
        description: "História, importância e impacto na atualidade",
      },
    ];
    return (
      <>
        <ListHeader title="Movimento estudantil" subtitle="Total 6" />
        <FlatList
          data={studentEngagement}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }

  function renderSupportive() {
    const search = [
      {
        id: "1",
        guild: {
          id: "1",
          name: "Identifcação de objetos em pessoas através de sistemas embarcados",
          icon: "https://i.pinimg.com/736x/07/c7/51/07c751e62cc9363d20d181b7a87857d3.jpg",
          owner: true,
        },
        category: "2",
        date: "22/06 ás 20:40h",
        description: "Traga seus amigos, vamos aprender mais sobre o cinema :)",
      },
    ];

    const users = [
      {
        id: "1",
        name: "Kora",
        course: "Ciência da Computação",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest/smart/width/250/height/250?cb=20161202194200&path-prefix=pt-br",
        email: "email@email.uesc.br",
      },
    ];
    return (
      <>
        <ListHeader title="Solidário" subtitle="Total 6" />
        <ScrollView>
          {!isOwnerSearch ? (
            <FlatList
              data={search}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              style={styles.matches}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
            />
          ) : (
            <>
              <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <User data={item} onPress={() => {}} />
                )}
                style={styles.matches}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
              />
            </>
          )}
        </ScrollView>
        <View style={styles.switchSearch}>
          <RectButton onPress={() => toggleSwitch(true)}>
            <Text style={styles.title}>Conexões</Text>
          </RectButton>
          <View style={styles.separtorView} />
          <RectButton onPress={() => toggleSwitch(false)}>
            <Text style={styles.title}>Doações</Text>
          </RectButton>
        </View>
      </>
    );
  }

  function renderFAQ() {
    return (
      <ScrollView style={{ marginTop: 24 }}>
        {FAQ.map((item, index) => (
          <View key={index}>
            <ExpandableComponent item={item} />
          </View>
        ))}
      </ScrollView>
    );
  }
  function renderCategories() {
    if (category === "1") {
      return renderSearch();
    }
    if (category === "2") {
      return renderStudy();
    }
    if (category === "3") {
      return renderStudentEngagement();
    }
    if (category === "4") {
      return renderSports();
    }
    if (category === "5") {
      return renderSupportive();
    }
    if (category === "6") {
      return renderFAQ();
    }
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        {user.uid !== "access-basic" && (
          <ButtonAdd onPress={handleAppointmentCreate} />
        )}
      </View>
      <View>
        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>
      {/* <ListHeader title="Partidas agendadas" subtitle="Total 6" />
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Appointment data={item} onPress={handleAppointmentDetails} />
        )}
        style={styles.matches}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        contentContainerStyle={{ paddingBottom: 69 }}
      /> */}
      {renderCategories()}
    </Background>
  );
}
