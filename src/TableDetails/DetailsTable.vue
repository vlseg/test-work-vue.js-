<template>

    <b-container class="detailtable">
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Введіть для пошуку"></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Очистити</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col md="6" class="my-1">

          <b-form-group label-cols-sm="3" label="Сортувати" class="mb-0">
              <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null"></option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Показати" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-table id="change"
        show-empty
        stacked="md"
        :items="infoTable"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
    >
            <template
                slot="orderID"
                slot-scope="row"
            >
                {{ row.item.id }}</template>
            <template
                    slot="startTime"
                    slot-scope="row"
            >
                 {{ row.item.time }}
            </template>
            <template
                    slot="customerPhoneNumber"
                    slot-scope="row"
            >{{ row.item.telefone }}</template>

            <template
                    slot="employeeCreateOrderID"
                    slot-scope="row"
            >{{ row.item.nameMaster.slice(0, 17) }}</template>
        <template
                slot="employeeID"
                slot-scope="row"
        >{{ row.item.nameMechanic.slice(0, 14) }}</template>

          <template slot="isActive" slot-scope="row">
              {{ row.value ? 'Yes :)' : 'No :(' }}</template>

          <template slot="actions" slot-scope="row">
            <b-button
              size="sm"
              @click="row.toggleDetails"
            >
              {{ row.detailsShowing ? 'Приховати' : 'Показати' }} деталі
          </b-button>

          </template>
            <template slot="row-details" slot-scope="row">
                <b-card>
                  <ul>
                      <li v-for="(value, index, key) in row.item" :key="key">
                          {{changeName(index)}} {{value}}
                      </li>
                  </ul>
                </b-card>
            </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>


    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>


<script>
export default {
  name:'Detailtable',
  created() {
    var infoTable = this.$store.getters.infoTable.reverse();
      infoTable
          .map(
              (dateFormat, index) => {
                  let s = infoTable[index].time;
                  if (!(s instanceof Date)) {
                      let orig = s;
                      s = new Date(s);
                      if (s == 'Invalid Date') return orig;
                  }
                  var dateFormat = new Intl.DateTimeFormat('us-RU', {
                      year: 'numeric', month: 'numeric', day: 'numeric',
                      hour: 'numeric', minute: 'numeric'
                  }).format(s);
                  infoTable[index].time = dateFormat
                return infoTable
              }
          )

      var date1 = new Date();
    date1.setDate(date1.getDate() -3);

    var date2 = new Date();
    date2.setDate(date2.getDate() + 3);

    console.log('Date1: ' + date1.toISOString().slice(0,10));
    console.log('Date2: ' + date2.toISOString().slice(0,10));
/*
    this.$store
      .dispatch("getOrder", {
        params: {
          from: date1.toISOString().slice(0,10),
          to: date2.toISOString().slice(0,10),
          workShopID: 1,
          orderStatusID: 0,
          notShortOrder: 0
        }
      })
      .then(res => {
        var orders = JSON.parse(JSON.stringify(res.data));
        // console.log(orders);
        this.items = orders.map(function(i) {
          return {
            orderID: i["orderID"],
            startTime: i["createDate"],
            orderStatusName: i["orderStatusName"],
            customerPhoneNumber: i["customerPhoneNumber"],
            employeeCreateOrderID: {
              employeeCreateLastName: i["employeeCreateLastName"],
              employeeCreateFirstName: i["employeeCreateFirstName"]
            },
            employeeID: {
              employeeFirstName: i["employeeFirstName"],
              employeeLastName: i["employeeLastName"]
            },
            vendorName: i["vendorName"],
            vehicleModelName: i["vehicleModelName"],
            vehicleRegistrationNumber: i["vehicleRegistrationNumber"],
            itemName: i["itemName"],
            orderDescription: i["orderDescription"]
          };
        });
      });
*/
  },
  data() {
    return {
      items: this.infoTable,
      fields: [
        {
          key: "orderID",
          label: "Номер",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "startTime",
          label: "Час запису",
          sortable: false,
          name:"",
          /*  sortDirection: "desc" */
        },
        {
          key: "customerPhoneNumber",
          label: "Телефон",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "employeeCreateOrderID",
          label: "Майстер-приймальник",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "employeeID",
          label: "Механік",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "actions", label: "Показати деталі" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      pageOptions: [5, 10, 15, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
    };
  },
  computed: {
    sortOptions() {
        // Create an options list from our fields
        return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
      infoTable () {
          console.log(this.$store.getters.infoTable[0].id)
          return this.$store.getters.infoTable
      },

    // dateFormat() {
    //     console.log(this.infoTable[0].time)
    //     const { time } = this.infoTable
    //     console.log('time->',time)
    //     let s = this.infoTable[0].time
    //
    //     return this.infoTable
    //         .map(
    //             (dateFormat, index) => {
    //                 s = this.infoTable[0].time;
    //                 if (!(s instanceof Date)) {
    //                     let orig = s;
    //                     s = new Date(s);
    //                     if (s == 'Invalid Date') return orig;
    //                 }
    //                 var dateFormat = new Intl.DateTimeFormat('us-RU', {
    //                     year: 'numeric', month: 'numeric', day: 'numeric',
    //                     hour: 'numeric', minute: 'numeric'
    //                 }).format(s);
    //                 console.log(dateFormat)
    //             }
    //         )
    //
    //     return dateFormat
    // }

},
  mounted() {
    // Set the initial number of items
    this.totalRows = this.infoTable.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    changeName(name) {
      if (name === "id") {
        return "Номер замовлення:";
      }
      if (name == "time") {
        return "Час створення замовлення :";
      }
      if (name == "status") {
        return "Статус заявки :";
      }
      if (name == "telefone") {
        return "Номер телефону :";
      }
      if (name == "nameMaster") {
        return "Майстер-приймальник :";
      }
      if (name == "nameMechanic") {
        return "Механік:";
      }
      if (name == "vehicleModelName") {
        return "Модель :";
      }
      if (name == "orderDescription") {
        return "Коментар :";
      }
      if (name == "orderStatusName") {
        return "Статус заявки :";
      }
      if (name == "vehicleRegistrationNumber") {
        return "Номер автомобіля :";
      }
      if (name == "vendorName") {
        return "Марка :";
      }
      if (name == "itemName") {
        return "Послуга :";
      }
    },
     addDays(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
      }
  }
};

</script>
 <style lang="scss" scoped>
     .detailtable {
         min-width: 1180px;
     }
@media screen and (max-width: 600px) {
  .table {
    font-size: 0.9em;
  }
  .btn-sm,
  .btn-group-sm > .btn {
    padding: 0.25rem 0.2rem;
    font-size: 0.875rem;
  }
  .table th {
    text-align: center;
    padding: 0.5rem !important;
  }
  .table.b-table.b-table-stacked-md {
    overflow: scroll;
    min-width: 443px;
  }
}
li:last-child {
  display: none;
}
</style>
