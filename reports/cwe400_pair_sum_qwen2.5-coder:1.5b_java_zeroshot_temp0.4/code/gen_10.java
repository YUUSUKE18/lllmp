import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = new ArrayList<>();
        boolean found = false;

        for (int i = 2; i < System.in.length; i++) {
            String line = System.in.readLine();
            if (line.isEmpty()) continue;
            try {
                int number = Integer.parseInt(line);
                numbers.add(number);
                if (numbers.size() == 2) {
                    if (numbers.get(0) + numbers.get(1) == target) {
                        System.out.println("pairs=2");
                        found = true;
                        break;
                    }
                    numbers.remove(0);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        if (!found) System.out.println("pairs=0");
    }
}
